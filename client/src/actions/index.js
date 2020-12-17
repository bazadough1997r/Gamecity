export const EDIT_PROFILE = "EDIT_PROFILE";

export function editProfile(info) {
    return {
        type: EDIT_PROFILE,
        payload: info,
    }
}

