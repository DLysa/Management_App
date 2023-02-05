import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Option } from "./option.model";

@Injectable()
export class ThemeService {
  constructor(
    private http: HttpClient,
  ) {}

  getThemeOptions(): Observable<Array<Option>> {
    return this.http.get<Array<Option>>("assets/themeOptions.json");
  }

  setTheme(themeToSet) {
    // TODO(@SiddAjmera): Implement this later
  }
}
