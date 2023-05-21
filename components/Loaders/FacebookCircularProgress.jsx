import { CircularProgress, circularProgressClasses } from '@mui/material'

const styles = {
  track: {
    color: ({ palette }) => palette.grey[palette.mode === 'light' ? 200 : 800],
  },

  progress: {
    position: 'absolute',
    left: 0,

    color: ({ palette }) => (palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
    animationDuration: '550ms',

    [`& .${circularProgressClasses.circle}`]: {
      strokeLinecap: 'round',
    },
  },
}

// looks like first <CircularProgress> just acts as a solid grey track (hence determinate with value of 100) for second working <CircularProgress>
// https://mui.com/material-ui/react-progress/#customization
export const FacebookCircularProgress = (props) => {
  return (
    <>
      <CircularProgress
        variant="determinate"
        value={100}
        sx={styles.track}
        size={40}
        thickness={4}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={styles.progress}
        size={40}
        thickness={4}
      />
    </>
  )
}
