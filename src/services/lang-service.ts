import { Injectable } from "@angular/core";

@Injectable()
export class LangService {
  private lang = 'de';

  constructor() {}

  setLang(val) { this.lang = val; }

  getLang() { return this.lang; }
}
