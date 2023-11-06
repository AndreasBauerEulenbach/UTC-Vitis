import {AccountService} from "@app/_services/account.service";

export function appInitializer(accountService: AccountService) {
    return () => {
      return new Promise<void>(resolve => {
        // attempt to refresh token on app start up to auto authenticate
        accountService.refreshToken()
          .subscribe().add(resolve);
      });
    };
}
