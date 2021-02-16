import {english} from '../../translations/english';
import {Injectable} from '@angular/core';
import {PxbAuthTranslations} from "../../translations/auth-translations";

@Injectable({
    providedIn: 'root',
})
export class LanguageLoaderService {
    constructor (private readonly _pxbAuthConfig) {}

    getTranslation(): PxbAuthTranslations {
        switch (this._pxbAuthConfig.languageCode) {
            case 'EN': {
                return english;
            }
        }
    }
}
