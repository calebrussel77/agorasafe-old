import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {useRef} from 'react';

import {Button} from '@components/lib/button/button';
import {Modal} from '@components/lib/modal/modal';
import SectionMessage from '@components/lib/section-message/section-message';

import {FormSubscription} from './form-subscription/form-subscription';
import {TSubscriptionForm} from './form-subscription/form-subscription.validation';

const sendUserSubscriptionRequest = (formData: FormData) => {
  return axios.post(
    'https://app.convertkit.com/forms/3997673/subscriptions',
    formData,
    {
      headers: {'content-type': 'multipart/form-data'},
    }
  );
};

const SubscriptionModal = ({dialog}) => {
  const {mutate, isLoading, isSuccess} = useMutation(
    sendUserSubscriptionRequest
  );

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = ({email, name}: TSubscriptionForm) => {
    let formData = new FormData();
    formData.append('email_address', email);
    formData.append('fields[first_name]', name);
    formData.append('user', 'd506b01f-b95b-4c4e-945e-f35dfa9f6a9d');
    mutate(formData);
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
        {isSuccess && (
          <div className="my-6">
            <SectionMessage
              title="Souscription réussie"
              hasCloseButton={false}
              appareance="success"
            >
              <p className="text-sm md:text-base">
                Merci d'avoir souscrit à l'enregistrement ! Un mail vous a été
                envoyé à votre adresse email afin de confirmer votre
                souscription.
              </p>
            </SectionMessage>
          </div>
        )}
        {!isSuccess && (
          <FormSubscription onSubmit={onSubmit} formRef={formRef} />
        )}
      </Modal.Body>
      {!isSuccess && (
        <Modal.Footer>
          <div className="flex justify-end w-full">
            <Button
              aria-label="Envoyer"
              loading={isLoading}
              onClick={() => formRef?.current?.requestSubmit()}
            >
              Envoyer
            </Button>
          </div>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export {SubscriptionModal};
