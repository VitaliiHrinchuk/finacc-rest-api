import { Module } from '@nestjs/common';
import { CurrencyService } from "./currency.service";
import { CurrencyApiInterface } from "./api/CurrencyApiInterface";
import { OXRApi } from "./api/OXRApi";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "nestjs-http-promise";

@Module({
  providers: [
    CurrencyService,
    {
      provide: CurrencyApiInterface,
      useClass: OXRApi
    }
  ],
  imports: [ConfigModule, HttpModule],
  exports: [CurrencyService]
})
export class CurrencyModule {}
