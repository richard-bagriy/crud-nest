import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtWithRefresh } from "../interfaces/jwt-with-refresh.interface"

export const GetCurrentUserDecorator = createParamDecorator(
    (data: keyof JwtWithRefresh | undefined, context: ExecutionContext) => {
      const request = context.switchToHttp().getRequest();
      if (!data) return request.user;
      return request.user[data];
    },
  );