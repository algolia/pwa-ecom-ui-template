import { Banner } from '@/components/banner/banner'
import BannerImage from '@/public/static/images/home/banner.jpg'

export default function Banners() {
  return (
    <div className="flex flex-col gap-3 my-3">
      <Banner
        size="xl"
        title="Banner XL"
        subtitle="Subtitle"
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum consequuntur delectus soluta vel aliquid culpa, possimus, earum excepturi illo reprehenderit, iure amet sequi ea ullam eos consectetur odio mollitia nihil."
        image={BannerImage}
        overlay={true}
        gradient={true}
        fullWidth={true}
      />

      <Banner
        size="xl"
        title="Banner XL"
        subtitle="Subtitle"
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum consequuntur delectus soluta vel aliquid culpa, possimus, earum excepturi illo reprehenderit, iure amet sequi ea ullam eos consectetur odio mollitia nihil."
        image={BannerImage}
        overlay={true}
        gradient={true}
        fullWidth={false}
      />

      <Banner
        size="l"
        title="Banner L"
        subtitle="Subtitle"
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum consequuntur delectus soluta vel aliquid culpa, possimus, earum excepturi illo reprehenderit, iure amet sequi ea ullam eos consectetur odio mollitia nihil."
        image={BannerImage}
        overlay={true}
        gradient={true}
        fullWidth={true}
      />

      <Banner
        size="l"
        title="Banner L"
        subtitle="Subtitle"
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum consequuntur delectus soluta vel aliquid culpa, possimus, earum excepturi illo reprehenderit, iure amet sequi ea ullam eos consectetur odio mollitia nihil."
        image={BannerImage}
        overlay={true}
        gradient={true}
        fullWidth={false}
      />

      <Banner
        size="m"
        title="Banner M"
        subtitle="Subtitle"
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum consequuntur delectus soluta vel aliquid culpa, possimus, earum excepturi illo reprehenderit, iure amet sequi ea ullam eos consectetur odio mollitia nihil."
        image={BannerImage}
        overlay={true}
        gradient={true}
        fullWidth={true}
      />

      <Banner
        size="m"
        title="Banner M"
        subtitle="Subtitle"
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum consequuntur delectus soluta vel aliquid culpa, possimus, earum excepturi illo reprehenderit, iure amet sequi ea ullam eos consectetur odio mollitia nihil."
        image={BannerImage}
        overlay={true}
        gradient={true}
        fullWidth={false}
      />

      <Banner
        size="s"
        title="Banner S"
        subtitle="Subtitle"
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum consequuntur delectus soluta vel aliquid culpa, possimus, earum excepturi illo reprehenderit, iure amet sequi ea ullam eos consectetur odio mollitia nihil."
        image={BannerImage}
        overlay={true}
        gradient={true}
        fullWidth={true}
      />

      <Banner
        size="s"
        title="Banner S"
        subtitle="Subtitle"
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum consequuntur delectus soluta vel aliquid culpa, possimus, earum excepturi illo reprehenderit, iure amet sequi ea ullam eos consectetur odio mollitia nihil."
        image={BannerImage}
        overlay={true}
        gradient={true}
        fullWidth={false}
      />

      <Banner size="xs-large" fullWidth={true}>
        Banner XS Large
      </Banner>

      <Banner size="xs-small" fullWidth={true}>
        Banner XS Small
      </Banner>
    </div>
  )
}
