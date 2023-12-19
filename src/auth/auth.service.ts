import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // compare password
    const pwMatches = await argon.verify(user.hash, dto.password);
    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    return this.signToken(user.id, user.email);
  }

  async refreshAccessToken(refreshToken: string): Promise<{
    access_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
  }> {
    const decoded = await this.jwt.verifyAsync(refreshToken, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
    });

    const payload = this.signToken(decoded.sub, decoded.email);

    return payload;
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{
    access_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
  }> {
    const payload = {
      sub: userId,
      email,
    };
    const accessSecret = this.config.get('JWT_ACCESS_SECRET');
    const refreshSecret = this.config.get('JWT_REFRESH_SECRET');

    // Generate access token
    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: 28800,
      secret: accessSecret,
    });

    // Generate refresh token
    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: 604800,
      secret: refreshSecret,
    });

    return {
      access_token: accessToken,
      expires_in: 28800,
      refresh_token: refreshToken,
      token_type: 'Bearer',
    };
  }
}
