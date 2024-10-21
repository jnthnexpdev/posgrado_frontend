import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-assing-revision',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './assing-revision.component.html',
  styleUrl: './assing-revision.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssingRevisionComponent {
  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    this.dateAdapter.getDayOfWeekNames('narrow');
  }
}