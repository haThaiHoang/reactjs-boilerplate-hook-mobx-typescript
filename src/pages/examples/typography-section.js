import Typography from '@/components/typography'

export default () => (
  <section>
    <p className="section-title">
      Typography
    </p>
    <div className="section-body">
      <Typography size="tiny">Tiny - 10px</Typography>
      <Typography size="small">Small - 12px</Typography>
      <Typography>Mormal - 14px</Typography>
      <Typography underline>Mormal - 14px - Underline</Typography>
      <Typography underline link>Mormal - 14px - Underline Link</Typography>
      <Typography primary>Mormal - 14px - Primary</Typography>
      <Typography secondary>Mormal - 14px - Secondary</Typography>
      <Typography size="large">Large - 16px</Typography>
      <Typography size="big">Big - 18px</Typography>
      <Typography size="huge">Huge - 20px</Typography>
      <Typography size="giant">Giant - 30px</Typography>
      <Typography size="enormous">Enormous - 40px</Typography>
    </div>
  </section>
)
