const styles = ({ degs, color1, color2 }) => ({
  backgroundImage: `linear-gradient(${degs}, ${color1}, ${color2})`,
  color: 'transparent',
  '-webkit-background-clip': 'text',
})

export default styles
