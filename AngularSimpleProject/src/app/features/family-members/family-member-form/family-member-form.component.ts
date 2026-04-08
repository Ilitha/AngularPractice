import { ChangeDetectionStrategy, Component, OnInit, computed, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FamilyMemberService } from '../../../core/services/family-member.service';
import { ClanService } from '../../../core/services/clan.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { Gender } from '../../../core/models/family-member.model';

@Component({
  selector: 'app-family-member-form',
  imports: [ReactiveFormsModule, PageHeaderComponent],
  templateUrl: 'family-member-form.component.html',
  styleUrl: 'family-member-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FamilyMemberFormComponent implements OnInit {
  readonly id = input<string>();

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly familyMemberService = inject(FamilyMemberService);
  private readonly clanService = inject(ClanService);

  readonly clans = this.clanService.clans;
  readonly isEditMode = computed(() => !!this.id());
  readonly pageTitle = computed(() => this.isEditMode() ? 'Edit Family Member' : 'Add Family Member');

  readonly genderOptions: { value: Gender; label: string }[] = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'non-binary', label: 'Non-binary' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' },
  ];

  readonly form = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    middleName: [''],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    maidenName: [''],
    clanId: [''],
    birthDate: [''],
    deathDate: [''],
    gender: ['' as Gender | ''],
    biography: [''],
    placeOfBirth: [''],
    currentLocation: [''],
    photoUrl: [''],
    notes: [''],
  });

  ngOnInit(): void {
    const id = this.id();
    if (id) {
      const member = this.familyMemberService.getMemberById(id);
      if (member) {
        this.form.patchValue({
          firstName: member.firstName,
          middleName: member.middleName,
          lastName: member.lastName,
          maidenName: member.maidenName,
          clanId: member.clanId,
          birthDate: member.birthDate,
          deathDate: member.deathDate,
          gender: member.gender,
          biography: member.biography,
          placeOfBirth: member.placeOfBirth,
          currentLocation: member.currentLocation,
          photoUrl: member.photoUrl,
          notes: member.notes,
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
    const memberData = {
      firstName: value.firstName ?? '',
      middleName: value.middleName ?? '',
      lastName: value.lastName ?? '',
      maidenName: value.maidenName ?? '',
      clanId: value.clanId ?? '',
      birthDate: value.birthDate ?? '',
      deathDate: value.deathDate ?? '',
      gender: (value.gender || 'prefer-not-to-say') as Gender,
      biography: value.biography ?? '',
      placeOfBirth: value.placeOfBirth ?? '',
      currentLocation: value.currentLocation ?? '',
      photoUrl: value.photoUrl ?? '',
      notes: value.notes ?? '',
      parents: [] as string[],
      children: [] as string[],
      spouses: [] as string[],
    };

    const id = this.id();
    if (id) {
      this.familyMemberService.updateMember(id, memberData);
    } else {
      this.familyMemberService.addMember(memberData);
    }
    this.router.navigate(['/family-members']);
  }

  onCancel(): void {
    this.router.navigate(['/family-members']);
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
