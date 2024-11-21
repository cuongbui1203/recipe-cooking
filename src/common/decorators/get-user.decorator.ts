import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const GetUser = createParamDecorator(
  (data: any, ctx: ExecutionContextHost) => {
    return ctx.switchToHttp().getRequest().user;
  },
);
