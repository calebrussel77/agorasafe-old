import { useUpdateUser } from '@api-providers/users';
import axios from 'axios';
import { getSession, signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { HiOutlinePencil } from 'react-icons/hi2';
import { toast } from 'react-toastify';

import { Field } from '@components/lib/Field/Field';
import { ActionOnTop } from '@components/lib/action-on-top/action-on-top';
import { Avatar } from '@components/lib/avatar/avatar';
import { Button } from '@components/lib/button/button';
import { Checkbox } from '@components/lib/checkbox/checkbox';
import Form, { useZodForm } from '@components/lib/form/form';
import { Input } from '@components/lib/input/input';
import { Label } from '@components/lib/label/label';
import { Notification } from '@components/lib/notification';
import SectionMessage from '@components/lib/section-message/section-message';
import { Textarea } from '@components/lib/textarea/textarea';
import { FileUpload } from '@components/lib/upload/file-upload';

import { profilSchema } from '@validations/user-infos-schema';

import { FormCardContainer } from '@pages/dashboard/__components/form-card-container/form-card-container';

import { TUserMeInfos } from '@interfaces/user-infos';

import { EXTENSION_IMAGES_ALLOWED } from '@constants/index';

const updateSessionRequest = () => {
  return axios.get('/api/auth/session?update', {
    headers: { 'content-type': 'multipart/form-data' },
  });
};

const ProfileInfosForm = ({ user }: { user: TUserMeInfos }) => {
  const form = useZodForm({
    schema: profilSchema,
  });

  const {
    register,
    reset,
    formState: { errors },
  } = form;

  const {
    avatar,
    first_name,
    last_name,
    website_url,
    bio,
    is_purchaser,
    is_provider,
    is_home_service_provider,
    is_remote_service_provider,
  } = user;

  const [value, setValue] = useState(avatar);

  const { updateUser, isLoading, error, isError } = useUpdateUser({
    onSuccess: async data => {
      await signIn('google', {
        callbackUrl: window.location.href,
        redirect: false,
      });
      toast(<Notification variant="success" title={data?.message} />);
    },
  });

  const onSubmit = async data => {
    updateUser({
      ...data,
      avatar: value,
    });
  };

  const onAddFile = file => {
    setValue(file);
  };

  useEffect(() => {
    if (user) {
      reset({
        website_url,
        is_purchaser,
        is_provider,
        is_home_service_provider,
        is_remote_service_provider,
        bio,
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
              Profil
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Ces informations seront diffusées publiquement donc faites
              attention à ce que vous renseignez
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <Form form={form} onSubmit={onSubmit}>
            <FormCardContainer
              footer={
                <div className="flex justify-end">
                  <Button
                    variant="primary"
                    disabled={isLoading}
                    loading={isLoading}
                  >
                    Enregistrer
                  </Button>
                </div>
              }
            >
              {isError && (
                <SectionMessage
                  className="mb-3"
                  appareance="danger"
                  title={error?.message}
                />
              )}
              <div className="grid grid-cols-6 gap-6">
                {/* File Upload */}
                <div className="col-span-6">
                  <Field
                    label="Photo"
                    hint="Le poids max. de l'avatar est de 2MB"
                  >
                    <FileUpload
                      accept={EXTENSION_IMAGES_ALLOWED}
                      preview={null}
                      name="avatar"
                      handleAddFile={onAddFile}
                      value={value}
                      {...(register('avatar') as any)}
                    >
                      {({ openFile, files }) => {
                        const file = files[0] as any;
                        const name = `${first_name} ${last_name}`;
                        return (
                          <ActionOnTop
                            className="rounded-full"
                            viewActionMode="now"
                            bgElement={
                              <Avatar
                                src={file?.preview || file}
                                fontSize={16}
                                className="h-16 w-16"
                                name={file?.name || name}
                              />
                            }
                          >
                            <div className="flex justify-center items-center w-full">
                              <Button
                                title="Changez votre avatar"
                                onClick={openFile}
                                type="button"
                                variant="light"
                                className="p-1 bg-transparent"
                              >
                                <HiOutlinePencil className="h-5 w-5" />
                              </Button>
                            </div>
                          </ActionOnTop>
                        );
                      }}
                    </FileUpload>
                  </Field>
                </div>

                {/* Site internet */}
                <div className="col-span-6">
                  <Field
                    label="Site internet"
                    hint="Tous liens succeptible de permettre aux personnes de vous suivre "
                  >
                    <Input
                      {...register('website_url')}
                      iconBefore={
                        <span className="inline-flex items-center text-sm text-gray-800">
                          http://
                        </span>
                      }
                      className="pl-[55px]"
                      type="text"
                      placeholder="www.example.com"
                    />
                  </Field>
                </div>

                {/* Bio */}
                <div className="col-span-6">
                  <Field
                    label="Bio"
                    hint={
                      'Ajoutez une description, qui donneras envie aux autres de collaborer avec vous.'
                    }
                  >
                    <Textarea
                      {...register('bio')}
                      cols={6}
                      rows={6}
                      type="text"
                      placeholder="Ecrivez ce qui vous caractérise et vous distingue le plus des autres..."
                    ></Textarea>
                  </Field>
                </div>

                {/* Je souhaite */}
                <div className="col-span-6 sm:col-span-3">
                  <div className="space-y-2">
                    <Label
                      required
                      variant={
                        (errors as any)?.desireError ? 'danger' : undefined
                      }
                    >
                      Je souhaite :
                    </Label>
                    <div className="flex flex-col gap-3">
                      <Field label="Proposer mes services">
                        <Checkbox {...register('is_provider')} />
                      </Field>
                      <Field label="Demander des services">
                        <Checkbox {...register('is_purchaser')} />
                      </Field>
                    </div>
                  </div>
                </div>

                {/* Je suis intéressé */}
                <div className="col-span-6 sm:col-span-3">
                  <div className="space-y-2">
                    <Label
                      required
                      variant={
                        (errors as any)?.desireError ? 'danger' : undefined
                      }
                    >
                      Je suis intéressé(e) par du travail à :
                    </Label>
                    <div className="flex flex-col gap-3">
                      <Field label="Domicile">
                        <Checkbox {...register('is_home_service_provider')} />
                      </Field>
                      <Field label="Distance">
                        <Checkbox {...register('is_remote_service_provider')} />
                      </Field>
                    </div>
                  </div>
                </div>
              </div>
            </FormCardContainer>
          </Form>
        </div>
      </div>
    </div>
  );
};

export { ProfileInfosForm };
