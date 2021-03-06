import { singer } from './singer';
import { changePassword } from './../vi/changePassword';
import { personal } from './personal';
import { setting } from './setting';
import { explore } from './explore';
import { authentication } from './authentication';
import { player } from './player';
import { common } from './common';
import {changeLanguage} from './changeLanguage';
import {search} from './search';
import { optionModal } from './optionModal';
import { device } from './device';

export default {
    'setting': setting,
    'personal': personal,
    'explore': explore,
    'authentication': authentication,
    'player': player,
    'common': common,
    'changePassword' : changePassword,
    'changeLanguage': changeLanguage,
    'singer': singer,
    'search': search,
    'optionModal': optionModal,
    'device': device
}
