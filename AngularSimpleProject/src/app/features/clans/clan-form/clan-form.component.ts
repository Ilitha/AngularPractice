import { ChangeDetectionStrategy, Component, OnInit, computed, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClanService } from '../../../core/services/clan.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-clan-form',
  imports: [ReactiveFormsModule, PageHeaderComponent],
  templateUrl: 'clan-form.component.html',
  styleUrl: 'clan-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClanFormComponent implements OnInit {
  readonly id = input<string>();

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly clanService = inject(ClanService);

  readonly isEditMode = computed(() => !!this.id());
  readonly pageTitle = computed(() => this.isEditMode() ? 'Edit Clan' : 'Add Clan');

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: [''],
    originRegion: [''],
    notes: [''],
    surnames: [''],
    traditions: [''],
  });

  ngOnInit(): void {
    const id = this.id();
    if (id) {
      const clan = this.clanService.getClanById(id);
      if (clan) {
        this.form.patchValue({
          name: clan.name,
          description: clan.description,
          originRegion: clan.originRegion,
          notes: clan.notes,
          surnames: clan.surnames.join(', '),
          traditions: clan.traditions.join(', '),
        });
      }
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    const clanData = {
      name: value.name ?? '',
      description: value.description ?? '',
      originRegion: value.originRegion ?? '',
      notes: value.notes ?? '',
      surnames: value.surnames
        ? value.surnames.split(',').map((s: string) => s.trim()).filter(Boolean)
        : [],
      traditions: value.traditions
        ? value.traditions.split(',').map((s: string) => s.trim()).filter(Boolean)
        : [],
    };
    const id = this.id();
    if (id) {
      this.clanService.updateClan(id, clanData);
    } else {
      this.clanService.addClan(clanData);
    }
    this.router.navigate(['/clans']);
  }

  onCancel(): void {
    this.router.navigate(['/clans']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control?.invalid && control.touched);
  }

  getFieldError(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (!control?.errors) return '';
    if (control.errors['required']) return 'This field is required.';
    if (control.errors['minlength']) {
      const min = control.errors['minlength'].requiredLength as number;
      return `Must be at least ${min} characters.`;
    }
    return 'Invalid value.';
  }
}
