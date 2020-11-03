export interface ReduxCallbacks {
	onSuccess?: (data?: any) => void;
	onFailed?: (data?: any) => void;
	onCancelled?: (data?: any) => void;
}
