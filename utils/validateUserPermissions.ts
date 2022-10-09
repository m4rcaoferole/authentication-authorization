type User = {
  permissions: string[];
  roles: string[];
}

type ValidateUserPermissionsParams = {
  user: User;
  permissions?: string[];
  roles?: string[];
}

export function validateUserPermissions({
  user,
  permissions = [],
  roles = [],
}: ValidateUserPermissionsParams) {
  if (permissions?.length > 0) {
    const hasAllPermissions = permissions?.every(permissions => {
      return user?.permissions.includes(permissions)
    })
    if (!hasAllPermissions) {
      return false;
    }
  }

  if (roles?.length > 0) {
    const hasAllRoles = roles?.some(permissions => {
      return user?.roles.includes(permissions)
    })
    if (!hasAllRoles) {
      return false;
    }
  }

  return true;
}