import { CurrencyApiInterface } from "./CurrencyApiInterface";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "nestjs-http-promise";
import { response } from "express";


@Injectable()
export class OXRApi implements CurrencyApiInterface {
  readonly path: string;
  readonly appId: string;

  constructor(
    private config: ConfigService,
    private httpService: HttpService
  ) {
    this.path = config.get<string>('OXR_URL');
    this.appId = config.get<string>('OXR_APP_ID');
  }


  fetchLatest(baseCurrency: string): Promise<any> {
    return this.httpService.get(this.path + 'latest.json', {
      params: {
        app_id: this.appId,
        base: baseCurrency
      }
    }).then(response => response.data);
  }

}