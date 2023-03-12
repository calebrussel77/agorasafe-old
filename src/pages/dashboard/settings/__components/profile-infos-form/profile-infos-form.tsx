import { User } from '@prisma/client';
import { useEffect } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { HiOutlinePencil } from 'react-icons/hi2';

import { Field } from '@components/lib/Field/Field';
import { Avatar } from '@components/lib/avatar/avatar';
import { Button } from '@components/lib/button/button';
import { Checkbox } from '@components/lib/checkbox/checkbox';
import Form, { useZodForm } from '@components/lib/form/form';
import ImageWithElementsOnTop from '@components/lib/image-with-elements-on-top/image-with-elements-on-top';
import { Input } from '@components/lib/input/input';
import { Label } from '@components/lib/label/label';
import { Textarea } from '@components/lib/textarea/textarea';
import {
  FileUpload,
  FileWithPreview,
} from '@components/lib/upload/file-upload';

import { profilSchema } from '@validations/user-infos-schema';

import { FormCardContainer } from '@pages/dashboard/__components/form-card-container/form-card-container';

import { TRegister } from '@interfaces/auth-user';

import { EXTENSION_IMAGES_ALLOWED } from '@constants/index';

type TProfileInfosForm = TRegister & {
  confirmError?: any;
  desireError?: any;
};

const ProfileInfosForm = ({ user }: { user: Omit<User, 'password'> }) => {
  const form = useZodForm({
    schema: profilSchema,
  });
  const {
    register,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = form;
  const {
    avatar,
    website_url,
    bio,
    is_purchaser,
    is_provider,
    is_home_service_provider,
  } = user;

  const watchFile = watch('avatar', []);

  const handleChangeFile = file => {
    setValue('avatar', file);
  };

  const onSubmit = async (data: TProfileInfosForm) => {
    console.log(data);
  };

  useEffect(() => {
    if (user) {
      reset({
        avatar,
        website_url,
        is_purchaser,
        is_provider,
        is_home_service_provider,
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
          <Form form={form} onSubmit={data => console.log(data)}>
            <FormCardContainer
              footer={
                <div className="flex justify-end">
                  <Button variant="primary">Enregistrer</Button>
                </div>
              }
            >
              <div className="grid grid-cols-6 gap-6">
                {/* File Upload */}
                <div className="col-span-6">
                  <Field
                    label="Photo"
                    hint="La taille maximale de photo à uploader est de 2MB"
                  >
                    <FileUpload
                      accept={EXTENSION_IMAGES_ALLOWED}
                      handleAddFile={handleChangeFile}
                      handleRemoveFile={handleChangeFile}
                      value={watchFile}
                      preview={null}
                      {...(register('avatar') as any)}
                    >
                      {({ openFile, files, onRemoveFile }) => {
                        const hasName = (files as FileWithPreview[])[0]?.name;
                        return (
                          <>
                            <div className="flex items-center gap-3">
                              {files.map((file: any, idx) => (
                                <ImageWithElementsOnTop
                                  key={idx}
                                  size="xl"
                                  src={file.preview || (file as string)}
                                  name={file.name}
                                  className="h-24 w-24"
                                  imageClassName="h-24 w-24"
                                >
                                  <button
                                    type="button"
                                    title="Changez la photo"
                                    className="p-1"
                                    onClick={openFile}
                                  >
                                    <HiOutlinePencil className="h-5 w-5 text-white" />
                                  </button>
                                </ImageWithElementsOnTop>
                              ))}
                              {/* {!hasName ? (
                                <Avatar size="xl" name="Caleb Russel" />
                              ) : (
                                <div>
                                  {files.map((file: FileWithPreview) => (
                                    <button
                                      key={file.preview}
                                      type="button"
                                      onClick={() => onRemoveFile(file)}
                                      className="relative z-10 group"
                                    >
                                      <Avatar
                                        size="xl"
                                        src={file.preview}
                                        name={file.name}
                                      />
                                      <div className="absolute inset-0 flex justify-center opacity-100 lg:group-hover:opacity-100 lg:opacity-0 items-center bg-gray-800 rounded-full">
                                        <HiOutlineTrash className="h-6 w-6 text-white" />
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              )} */}
                              <Button
                                variant="subtle"
                                type="button"
                                size="sm"
                                onClick={openFile}
                              >
                                Changer la photo
                              </Button>
                            </div>
                          </>
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
