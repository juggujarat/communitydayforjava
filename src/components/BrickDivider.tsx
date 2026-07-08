/**
 * Repeating brick/pattern strip used between sections (and, taller, in the footer).
 * Ported from the original bundle's
 *   <div aria-hidden style="height:44px; background:url(SVG) repeat-x center / auto 44px;">
 */
interface BrickDividerProps {
  src: string
  height?: number
  id?: string
  /** Footer variant spans the full viewport width. */
  fullBleed?: boolean
}

export default function BrickDivider({ src, height = 44, id, fullBleed = false }: BrickDividerProps) {
  const style: React.CSSProperties = {
    height,
    background: `url("${src}") repeat-x center / auto ${height}px`,
  }
  if (fullBleed) {
    style.position = 'relative'
    style.zIndex = 2
    style.marginTop = 36
    style.width = '100vw'
    style.marginLeft = 'calc(50% - 50vw)'
  }
  return <div aria-hidden="true" id={id} style={style} />
}
