import Image from 'next/image'

const styles = {
  objectFit: 'cover',
}

export const CoverImage = ({ src, style, ...props }) => {
  return (
    <Image
      src={src} //
      fill
      style={{ ...styles, ...style }}
      {...props}
    />
  )
}
