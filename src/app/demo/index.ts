import { InitComponent } from './init/init.component';
import { ANIMATION_COMPONENTS } from './animations/index';
import { WWOpenDataComponent } from './ww-open-data/open-data.component';

export const DEMO_COMPONENTS = [InitComponent, WWOpenDataComponent, ...ANIMATION_COMPONENTS];

export { InitComponent, WWOpenDataComponent };
