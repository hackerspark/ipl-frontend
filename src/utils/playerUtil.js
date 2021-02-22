import {playerLabels} from '../lookups/playerMapping';

export function processPlayerKey(key) {
    return playerLabels[key];
}