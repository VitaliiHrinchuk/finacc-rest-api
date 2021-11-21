import { Injectable, StreamableFile } from "@nestjs/common";
import { CurrencyApiInterface } from "./api/CurrencyApiInterface";
import { HttpService } from "@nestjs/axios";
import * as fs from 'fs';
import { join } from "path";

@Injectable()
export class CurrencyService {
  constructor(
    private readonly currencyApi: CurrencyApiInterface
  ) {
  }

  _formatLocalFileName(base: string) {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${base}`;
  }

  _getLocalFilePath(base: string): string {
    const fileName = this._formatLocalFileName(base) + ".json";
    return process.cwd() + '/files/' + fileName;
  }

  async _fetchCurrencies(base: string): Promise<CurrencyRates> {
    const currencies = await this.currencyApi.fetchLatest(base);
    console.log('fetched ', currencies);
    const result: CurrencyRates = {
      base: currencies.base,
      rates: currencies.rates
    };

    return new Promise((resolve, reject) => {
      const filePath = this._getLocalFilePath(base);
      console.log('saved to ' + filePath);
      fs.writeFile(filePath, JSON.stringify(result), (err) => {
        if (err) {
          console.log('error is', err);
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  }

  async _getLocalCurrencies(base: string): Promise<CurrencyRates> {
    const filePath = this._getLocalFilePath(base);
    console.log('fetching local:', filePath);
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
          return reject(err);
        } else {
          const formattedData = JSON.parse(data);

          return resolve({
            base: formattedData.base,
            rates: formattedData.rates
          });
        }
      });
    });
  }

  async getCurrencies(base: string): Promise<CurrencyRates> {
    try {
      console.log("===== Trying to get currencies local");
      const result: CurrencyRates = await this._getLocalCurrencies(base);

      return result;
    } catch (e) {
      console.log("===== Fail. Fetching from api.....");
      const result: CurrencyRates = await this._fetchCurrencies(base);

      return result;
    }
  }

  async convert(baseCurrency: string, resultCurrency: string, amount: number): Promise<number> {
    const currency: CurrencyRates = await this.getCurrencies(baseCurrency);
    const resultCurrencyRate = currency.rates[resultCurrency];

    return amount / resultCurrencyRate;
  }

}