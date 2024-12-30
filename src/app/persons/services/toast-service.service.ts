import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastType } from '../utils/enums/toastType';

/**
 * @author Aaron Pérez
 * @since 29/12/2024
 */

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

  constructor(private toastService: ToastrService) { }

  /**
   * Muestra un mensaje emergente
   * @param title
   * @param message
   * @param toastType
   */
  public message(title: string, message: string, toastType: ToastType): void {
    switch(toastType){
      case ToastType.INFO:
        this.toastService.info(message, title);
        break;
      case ToastType.ERROR:
        this.toastService.error(message, title);
        break;
      case ToastType.SUCCESS:
        this.toastService.success(message, title);
        break;
      case ToastType.WARNING:
        this.toastService.warning(message, title);
        break;
    }
  }
}
