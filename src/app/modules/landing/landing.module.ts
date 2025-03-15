import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConsultComponent } from '@components/consult/consult.component';
import { HeaderComponent } from '@components/header/header.component';
import { InfoComponent } from '@components/info/info.component';
import { MainComponent } from '@components/main/main.component';
import { ServComponent } from '@components/serv/serv.component';
import { TestimonialsComponent } from '@components/testimonials/testimonials.component';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { ContactComponent } from '@components/contact/contact.component';
import { FooterComponent } from '@components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SvgFlowerComponent } from '@components/svg-flower/svg-flower.component';

@NgModule({
  declarations: [
    LandingComponent,
    HeaderComponent,
    MainComponent,
    InfoComponent,
    ServComponent,
    ConsultComponent,
    TestimonialsComponent,
    ContactComponent,
    FooterComponent,
    SvgFlowerComponent,
  ],
  imports: [CommonModule, LandingRoutingModule, FontAwesomeModule],
})
export class LandingModule {}
