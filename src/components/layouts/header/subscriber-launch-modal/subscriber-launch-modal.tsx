import axios from 'axios';
import {useRef} from 'react';
import {HiCheckCircle} from 'react-icons/hi2';
import {Else, If, Then} from 'react-if';
import {useMutation} from 'react-query';

import {Button} from '@components/lib/button/button';
import {Modal} from '@components/lib/modal/modal';
import SectionMessage, {
  SectionMessageAction,
} from '@components/lib/section-message/section-message';

import {FormSubscription} from './form-subscription/form-subscription';

const SubscriberLaunchModal = ({dialog}) => {
  const {mutate, isLoading, isSuccess} = useMutation((formData: FormData) => {
    return axios.post(
      'https://app.convertkit.com/forms/3997673/subscriptions',
      formData,
      {
        headers: {'content-type': 'multipart/form-data'},
      }
    );
  });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = ({email_subscription, name_subscription}) => {
    let formData = new FormData();
    formData.append('email_address', email_subscription);
    formData.append('fields[first_name]', name_subscription);
    formData.append('user', 'd506b01f-b95b-4c4e-945e-f35dfa9f6a9d');
    mutate(formData);
  };

  return (
    <Modal state={dialog} className="md:w-[630px] 2xl:w-[650px]">
      <Modal.Header title={`Enregistrement du lancement`}>
        <p className="px-3 text-gray-500 text-sm mt-1">
          Renseignez votre nom et votre addresse email pour être informé du
          lancement d'Agorasafe. Vos donnéés ne seront en aucun cas partagés ou
          divulgués auprès de tierce personnes.{' '}
        </p>
      </Modal.Header>
      <If condition={isSuccess}>
        <Then>
          <Modal.Body>
            <div className="my-6 p-2">
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
          </Modal.Body>
        </Then>
        <Else>
          <Modal.Body>
            <FormSubscription onSubmit={onSubmit} formRef={formRef} />
          </Modal.Body>
          <Modal.Footer>
            <div className="flex justify-end w-full">
              <Button
                onClick={() => formRef?.current?.requestSubmit()}
                isLoding={isLoading}
              >
                Envoyer
              </Button>
            </div>
          </Modal.Footer>
        </Else>
      </If>
    </Modal>
  );
};

export {SubscriberLaunchModal};
