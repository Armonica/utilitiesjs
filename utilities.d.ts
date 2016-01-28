
declare module "utilities" {
    import * as tmp from 'utilitiesjs/lib/index';
	export = tmp;
}

declare module "utilitiesjs/lib/index" {
    import * as tmp from 'lib/index';
	export = tmp;
}
