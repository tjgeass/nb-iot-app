const getters = {
  sidebar: state => state.app.sidebar,
  topbar: state => state.app.topbar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  organization: state => state.device.organization,
  devices: state => state.device.devices,
}
export default getters
