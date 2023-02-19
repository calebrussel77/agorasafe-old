import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {Session} from 'next-auth';
import {FC} from 'react';

import {AuthLayout} from '@components/layouts/auth-layouts';

import {requireAuth} from '@utils/requireAuth';

import {Sidebar} from './__components/sidebar/sidebar';

type TDashboardPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

const DashboardPage: FC<TDashboardPageProps> = ({data: session}) => {
  const pageTitle = `Tableau de bord - ${session?.user?.name}`;

  return (
    <AuthLayout title={pageTitle}>
      <Sidebar />
      <div className="ml-[320px] flex justify-center">
        <div className="px-6 max-w-7xl w-full">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit sapiente
          rerum aliquid cum facilis ipsam aliquam at tempora veniam soluta?
          Magnam dolores distinctio corporis. Eaque facilis illo ea fugit
          itaque! Corporis at tempora ex nam molestiae quod magnam dolor dolorem
          doloribus eum aspernatur minus consectetur vitae facere animi
          quisquam, ab maiores, doloremque quae laborum nesciunt? Ipsam quidem
          nobis voluptatem odio. Porro nihil inventore rem repellendus quia qui
          similique ducimus ullam nulla exercitationem, minus, adipisci modi,
          molestias pariatur voluptates ea error nostrum explicabo corporis quae
          delectus nemo. Vel dolorum doloribus architecto! Exercitationem rem
          molestias velit expedita, odio mollitia quas itaque iste ab ut magnam
          ratione odit, tempore eligendi quos, deserunt dolorum non minima ea
          totam qui tenetur! Aspernatur excepturi sint impedit? Cum iste vero
          repellat itaque reprehenderit, non animi impedit illum ea, ullam
          quidem dolore! Magnam suscipit, alias culpa exercitationem nisi sunt
          amet ea possimus, laboriosam reiciendis pariatur saepe veritatis
          soluta. Ullam numquam iste illum minus magnam ipsum ut reprehenderit
          dolorem dolor atque quidem rerum id rem eos maxime, quae sed in iusto
          fugit repudiandae odio quos odit nostrum. Qui, minima? Veniam ullam,
          nobis dolores blanditiis itaque inventore minus repellendus aut, et at
          deleniti. Quia iste incidunt eius a, sapiente voluptatibus facilis.
          Blanditiis nihil laboriosam, quibusdam voluptatibus sed expedita
          accusantium consequatur. Distinctio, quasi! Assumenda, quisquam ad
          cumque laborum ratione totam sequi quae placeat aspernatur beatae, et
          consequuntur ipsam aliquid exercitationem voluptate ducimus quidem
          similique tenetur, natus nulla eum blanditiis incidunt. Excepturi!
          Sunt, maiores. Nam eos vel necessitatibus? A quidem eius fugiat cum
          laborum illum iste eos, ab sapiente iure reprehenderit perspiciatis
          eligendi, voluptates accusamus, itaque explicabo quam vitae
          accusantium reiciendis provident? Ipsum laudantium delectus neque
          voluptas. Architecto voluptates amet magni nam nesciunt. Commodi, et
          eos, reprehenderit perferendis dolorem libero ducimus natus
          praesentium iste totam ipsa asperiores, optio iure fuga assumenda
          provident! Laborum quisquam, praesentium modi quaerat eius eum
          consectetur doloremque sit? Soluta laborum harum, obcaecati, placeat
          dignissimos, qui neque aliquam facilis amet id reiciendis aut nisi
          eius pariatur impedit rerum veritatis. Reiciendis quo minus quae dicta
          nobis libero mollitia atque debitis officia laboriosam. Maiores harum
          consequuntur unde veniam ipsa. Necessitatibus perspiciatis omnis
          doloribus excepturi quibusdam repellat corrupti expedita accusantium
          alias. Facilis! Cum consequatur officia perspiciatis blanditiis minima
          in sequi, labore qui, mollitia iste eos neque vel doloribus dolorum?
          Velit earum neque fuga, nostrum praesentium non possimus impedit aut
          nulla quidem id! Iusto vel laboriosam repudiandae officiis voluptates
          saepe deserunt quidem asperiores explicabo! Voluptate ex esse, illum
          quasi, dicta obcaecati, officia illo ab suscipit officiis rem
          veritatis iure minima in ad numquam! Dolor dicta pariatur quo
          voluptate ipsa, iste quisquam atque quis vitae mollitia,
          necessitatibus nostrum nisi? Dolore, dolor animi, architecto officia
          non nesciunt molestiae id corrupti at expedita optio voluptatibus ut.
          Ea repellendus dignissimos excepturi? Neque delectus facilis nobis
          autem, suscipit explicabo perspiciatis corporis maxime expedita minima
          quibusdam nemo, esse, earum eaque. Nulla alias dolorum incidunt ipsa
          cumque consectetur sit iste? Soluta, quibusdam rem similique error ab
          amet itaque incidunt excepturi officiis, doloribus et alias facilis,
          maiores optio obcaecati delectus quas quidem fugiat nam maxime ea hic
          exercitationem facere harum! Quod. Non ea earum voluptates explicabo
          beatae esse dicta vitae eligendi nulla inventore obcaecati,
          consectetur neque totam? Quod amet facilis neque expedita enim optio
          ad, deleniti modi in animi ut distinctio. fugiat cum laborum illum
          iste eos, ab sapiente iure reprehenderit perspiciatis eligendi,
          voluptates accusamus, itaque explicabo quam vitae accusantium
          reiciendis provident? Ipsum laudantium delectus neque voluptas.
          Architecto voluptates amet magni nam nesciunt. Commodi, et eos,
          reprehenderit perferendis dolorem libero ducimus natus praesentium
          iste totam ipsa asperiores, optio iure fuga assumenda provident!
          Laborum quisquam, praesentium modi quaerat eius eum consectetur
          doloremque sit? Soluta laborum harum, obcaecati, placeat dignissimos,
          qui neque aliquam facilis amet id reiciendis aut nisi eius pariatur
          impedit rerum veritatis. Reiciendis quo minus quae dicta nobis libero
          mollitia atque debitis officia laboriosam. Maiores harum consequuntur
          unde veniam ipsa. Necessitatibus perspiciatis omnis doloribus
          excepturi quibusdam repellat corrupti expedita accusantium alias.
          Facilis! Cum consequatur officia perspiciatis blanditiis minima in
          sequi, labore qui, mollitia iste eos neque vel doloribus dolorum?
          Velit earum neque fuga, nostrum praesentium non possimus impedit aut
          nulla quidem id! Iusto vel laboriosam repudiandae officiis voluptates
          saepe deserunt quidem asperiores explicabo! Voluptate ex esse, illum
          quasi, dicta obcaecati, officia illo ab suscipit officiis rem
          veritatis iure minima in ad numquam! Dolor dicta pariatur quo
          voluptate ipsa, iste quisquam atque quis vitae mollitia,
          necessitatibus nostrum nisi? Dolore, dolor animi, architecto officia
          non nesciunt molestiae id corrupti at expedita optio voluptatibus ut.
          Ea repellendus dignissimos excepturi? Neque delectus facilis nobis
          autem, suscipit explicabo perspiciatis corporis maxime expedita minima
          quibusdam nemo, esse, earum eaque. Nulla alias dolorum incidunt ipsa
          cumque consectetur sit iste? Soluta, quibusdam rem similique error ab
          amet itaque incidunt excepturi officiis, doloribus et alias facilis,
          maiores optio obcaecati delectus quas quidem fugiat nam maxime ea hic
          exercitationem facere harum! Quod. Non ea earum voluptates explicabo
          beatae esse dicta vitae eligendi nulla inventore obcaecati,
          consectetur neque totam? Quod amet facilis neque expedita enim optio
          ad, deleniti modi in animi ut distinctio.
        </div>
      </div>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  data: Session;
}> = async ctx => {
  return requireAuth({
    ctx,
    cb({session}) {
      return {
        props: {data: session},
      };
    },
  });
};

export default DashboardPage;
