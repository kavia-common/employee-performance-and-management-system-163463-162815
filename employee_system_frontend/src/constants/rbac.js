export const rolesConfig = {
  super_admin: {
    nav: ['dashboard','attendance','meetings','tasks','leaves','analytics','notifications','settings'],
    permissions: ['read:all','write:all','approve:leaves','assign:tasks']
  },
  manager: {
    nav: ['dashboard','attendance','meetings','tasks','leaves','analytics','notifications'],
    permissions: ['read:team','write:team','approve:leaves','assign:tasks']
  },
  team_leader: {
    nav: ['dashboard','attendance','meetings','tasks','leaves','notifications'],
    permissions: ['read:team','assign:tasks']
  },
  employee: {
    nav: ['dashboard','attendance','meetings','tasks','leaves','notifications'],
    permissions: ['read:self','request:leave']
  },
  guest: {
    nav: [],
    permissions: []
  }
};
