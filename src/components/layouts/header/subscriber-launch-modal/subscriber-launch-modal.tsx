import {useRef} from 'react';

import {Button} from '@components/lib/button/button';
import {Modal} from '@components/lib/modal/modal';
import SectionMessage, {
  SectionMessageAction,
} from '@components/lib/section-message/section-message';

import {FormSubscription} from './form-subscription/form-subscription';

const SubscriberLaunchModal = ({dialog}) => {
  // const {mutate, isLoading, isSuccess} = useMutation((formData: FormData) => {
  //   return axios.post(
  //     'https://app.convertkit.com/forms/3997673/subscriptions',
  //     formData,
  //     {
  //       headers: {'content-type': 'multipart/form-data'},
  //     }
  //   );
  // });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = ({email_subscription, name_subscription}) => {
    let formData = new FormData();
    formData.append('email_address', email_subscription);
    formData.append('fields[first_name]', name_subscription);
    formData.append('user', 'd506b01f-b95b-4c4e-945e-f35dfa9f6a9d');
    // mutate(formData);
  };

  return (
    <Modal state={dialog} className="md:w-[630px] 2xl:w-[650px]">
      <Modal.Header title={`Enregistrement du lancement`}>
        <p className="px-3 text-gray-500">
          Remplissez le formulaire ci-dessous afin d'être informé du lancement
          d'Agorasafe. Les données renseignées ne seront en aucun cas partagées
          ou divulguées auprès de tierces personnes.{' '}
        </p>
      </Modal.Header>
      <Modal.Body>
        {false && (
          <div className="my-6">
            <SectionMessage
              title="Souscription réussie"
              hasCloseButton={false}
              appareance="success"
            >
              <p className="text-sm md:text-base">
                Merci d'avoir souscrit à l'enregistrement ! Un mail vous a été
                envoyé via votre adresse email afin de confirmer votre
                souscription.
              </p>
            </SectionMessage>
          </div>
        )}
        <FormSubscription onSubmit={onSubmit} formRef={formRef} />
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-end w-full">
          <Button onClick={() => formRef?.current?.requestSubmit()}>
            Envoyer
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export {SubscriberLaunchModal};
