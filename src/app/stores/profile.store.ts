import { inject, Injectable } from "@angular/core";
import { Status } from "../utils/enums";
import { User } from "../core/interfaces/user";
import { BehaviorSubject } from "rxjs";
import { UserService } from "../core/services/user.service";

@Injectable({ providedIn: 'root' })
export class ProfileStore {
    private usersService = inject(UserService);
    private profileSubject = new BehaviorSubject<User>({});
    profile$ = this.profileSubject.asObservable();

    private statusSubject = new BehaviorSubject<Status>(Status.Initial);
    status$ = this.statusSubject.asObservable();

    async getProfile() {
        this.statusSubject.next(Status.Loading);
        const result: User = await this.usersService.getUser();
        this.profileSubject.next(result ?? {});
        this.statusSubject.next(Status.Loaded);
    }

    clearProfile() {
        this.profileSubject.next({});
    }

    getProfileSnapshot() {
        return this.profileSubject.getValue();
    }
}