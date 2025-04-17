import { isPlatformBrowser } from '@angular/common';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
// import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  // URL = environment.urlBack + 'contact/';

  public isBrowser!: boolean;
  public isMobile!: boolean;
  public sticky!: boolean;
  public imgIndex!: boolean;
  public imgNosotros!: boolean;
  public show!: boolean;
  public menuToggle!: boolean;
  public menu!: boolean;
  public contactImg!: boolean;
  public servicios!: boolean;
  public trabajos!: boolean;
  public testimonios!: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object // private http: HttpClient
  ) {
    // Verifica si la aplicación se está ejecutando en un navegador
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      // Obtén el agente de usuario del navegador
      //@ts-ignore
      const { userAgentData, userAgent } = window.navigator;

      if (userAgentData) this.isMobile = userAgentData.mobile;
      else if (
        userAgent.match(/Android/i) ||
        userAgent.match(/webOS/i) ||
        userAgent.match(/iPhone/i) ||
        userAgent.match(/iPad/i) ||
        userAgent.match(/iPod/i) ||
        userAgent.match(/BlackBerry/i) ||
        userAgent.match(/Windows Phone/i)
      )
        this.isMobile = true;
      else this.isMobile = false;
    }
  }

  // headers() {
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   });
  // }

  // sendClick(event: string) {
  //   let headers = this.headers();

  //   return this.http.post(this.URL + 'click', { event }, { headers });
  // }
}
