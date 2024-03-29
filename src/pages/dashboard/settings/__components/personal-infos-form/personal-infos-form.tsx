import { Sex, User } from '@prisma/client';
import { useEffect } from 'react';

import { Field } from '@components/lib/Field/Field';
import { Button } from '@components/lib/button/button';
import Form, { useZodForm } from '@components/lib/form/form';
import { Input } from '@components/lib/input/input';
import { RadioGroup } from '@components/lib/radio-group/radio-group';

import { personalInfosSchema } from '@validations/user-infos-schema';

import { FormCardContainer } from '@pages/dashboard/__components/form-card-container/form-card-container';

import { TRegister } from '@interfaces/auth-user';
import { TUserMeInfos } from '@interfaces/user-infos';

type TPersonalInfosForm = TRegister & {
  confirmError?: any;
  desireError?: any;
};

const PersonalInfosForm = ({ user }: { user: TUserMeInfos }) => {
  const form = useZodForm({
    schema: personalInfosSchema,
    defaultValues: {
      sex: Sex.MALE,
    },
  });

  const {
    register,
    reset,
    formState: { errors, isSubmitting },
  } = form;
  const { first_name, last_name, sex, email, phone, adresse, birthdate } = user;

  const onSubmit = async (data: TPersonalInfosForm) => {
    console.log(data);
  };

  useEffect(() => {
    if (user) {
      reset({
        first_name,
        last_name,
        phone,
        adresse,
        birthdate,
        sex,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, user]);

  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Informations personnelles
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
                      type="email"
                      value={email}
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
                      {...register('adresse')}
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
                      {...register('sex')}
                      options={[
                        { label: 'Homme', value: Sex.MALE },
                        { label: 'Femme', value: Sex.FEMALE },
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
