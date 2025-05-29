import { Component, inject } from '@angular/core';
import { NgbModalRef, NgbModal, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, map } from 'rxjs';
import { User } from '../../core/interfaces/user';
import { UsersStore } from '../../stores/user.store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  imports: [CommonModule, FormsModule, NgbDropdownModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  // Users
  usersStore = inject(UsersStore);
  usersList = this.usersStore.users$;
  searchResultList = this.usersStore.searchResult$;
  loading = this.usersStore.loading$;

  // Displayed list: use search results if available, otherwise fallback
  displayedUsers = combineLatest([
    this.usersList,
    this.searchResultList
  ]).pipe(
    map(([users, searchResults]) => {
      const safeUsers = Array.isArray(users) ? users : [];
      const safeSearch = Array.isArray(searchResults) ? searchResults : [];
      return safeSearch.length > 0 ? safeSearch : safeUsers;
    })
  );

  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Load Users if empty
    if (this.usersStore.getUserSnapshot().length === 0) {
      this.usersStore.getAllUsers();
    }
  }

  // User form
  modalRef: NgbModalRef | null = null;
  modalService: NgbModal = inject(NgbModal)
  userData: User = {};

  getUsers() {
    this.usersStore.getAllUsers();
  }

  onViewUser(content: any, user: User) {
    this.modalRef = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
    });
    this.userData = user;
  }

  onCreate() {
    //
  }

  onDelete() {
    //
  }

  onUpdateUser() {
    this.modalRef?.close();
  }

  onSelectUser(event: Event, user: User) {
    //
  }

  onSelectAllUsers(event: Event) {
    //
  }

  onActivateUser(event: Event) {
    const input = event.target as HTMLInputElement;
    this.userData.isActive = input.checked;
  }

  onChangeUserStatus(status: string) {
    this.userData.userStatus = status.toLowerCase();
  }
}
