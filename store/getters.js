const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  nickname: state => state.user.nickname,
  mobile: state => state.user.mobile,
  hasLogin: state => state.user.hasLogin,
  hasSkip: state => state.user.hasSkip,
  weatherData :state=> state.user.weatherData,
  devices: state => state.device.devices,
  follows: state => state.device.follows,
  message: state => state.device.message,
  device: state => state.device.device,
  project:state => state.device.project
}
export default getters
