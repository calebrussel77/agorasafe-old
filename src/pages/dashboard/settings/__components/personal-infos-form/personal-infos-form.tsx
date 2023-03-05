import { Checkbox } from 'ariakit';

import { Field } from '@components/lib/Field/Field';
import { Button } from '@components/lib/button/button';
import Form, { useZodForm } from '@components/lib/form/form';
import { HelperMessage } from '@components/lib/helper-message/helper-message';
import { Input } from '@components/lib/input/input';
import { Notification } from '@components/lib/notification/notification';
import { RadioGroup } from '@components/lib/radio-group/radio-group';

import { FormCardContainer } from '@pages/dashboard/__components/form-card-container/form-card-container';

import { TRegister } from '@interfaces/auth-user';

type TPersonalInfosForm = TRegister & {
  confirmError?: any;
  desireError?: any;
};

const PersonalInfosForm = () => {
  const form = useZodForm({});

  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: TPersonalInfosForm) => {
    console.log(data);
  };

  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Informations peronnelles
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Gérer vos infos personnelles tout ayant le contrôle sur leur
              visibilité.
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <Form form={form} onSubmit={data => console.log(data)}>
            <FormCardContainer
              footer={
                <div className="flex justify-end">
                  <Button variant="primary">Enregistrer</Button>
                </div>
              }
            >
              <div className="grid grid-cols-6 gap-6">
                {/* Nom */}
                <div className="col-span-6 sm:col-span-3">
                  <Field label="Nom" required>
                    <Input
                      {...register('first_name')}
                      type="text"
                      placeholder="John"
                    />
                  </Field>
                </div>

                {/* Prénom */}
                <div className="col-span-6 sm:col-span-3">
                  <Field label="Prénom" required>
                    <Input
                      {...register('last_name')}
                      type="text"
                      placeholder="Doe"
                    />
                  </Field>
                </div>

                {/* Adresse email */}
                <div className="col-span-6 sm:col-span-3">
                  <Field label="Adresse email" required disabled>
                    <Input
                      {...register('email')}
                      type="email"
                      value="calebrussel77@gmail.com"
                      placeholder="johndoe@example.com"
                    />
                  </Field>
                </div>

                {/* Téléphone */}
                <div className="col-span-6 sm:col-span-3">
                  <Field label="Téléphone">
                    <Input
                      {...register('phone')}
                      type="text"
                      placeholder="+237 655 89 24 78"
                    />
                  </Field>
                </div>

                {/* Localisation */}
                <div className="col-span-6 sm:col-span-3">
                  <Field
                    label="Localisation"
                    required
                    hint="Champs utile pour la pertinence de votre profil au sein des résultats de recherche"
                  >
                    <Input
                      {...register('localisation')}
                      type="text"
                      placeholder="Bonaberie Douala, cameroun"
                    />
                  </Field>
                </div>

                {/* Date de naissance */}
                <div className="col-span-6 sm:col-span-3">
                  <Field label="Date de naissance">
                    <Input
                      {...register('birthdate')}
                      type="date"
                      placeholder="Doe"
                    />
                  </Field>
                </div>

                {/* Sexe */}
                <div className="col-span-6 sm:col-span-3">
                  <Field label="Sexe">
                    <RadioGroup
                      {...register('work_routine')}
                      options={[
                        { label: 'Homme', value: 'isFullTime' },
                        { label: 'Femme', value: 'isPartTime' },
                      ]}
                    />
                  </Field>
                </div>
              </div>
            </FormCardContainer>
          </Form>
        </div>
      </div>
    </div>
  );
};

export { PersonalInfosForm };
