import { Photo, Skill, User } from '@prisma/client';
import clsx from 'clsx';
import { useCallback, useEffect } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import { HiOutlinePencil } from 'react-icons/hi';
import { HiOutlineTrash } from 'react-icons/hi2';

import { Field } from '@components/lib/Field/Field';
import { ActionOnTop } from '@components/lib/action-on-top/action-on-top';
import { Button } from '@components/lib/button/button';
import Form, { useZodForm } from '@components/lib/form/form';
import ImageEmpty from '@components/lib/image-empty/image-empty';
import { ImageUI } from '@components/lib/image-ui/image-ui';
import { Label } from '@components/lib/label/label';
import { AsyncCreatableSelectUI, SelectUI } from '@components/lib/select';
import {
  FileUpload,
  FileWithPreview,
} from '@components/lib/upload/file-upload';
import { VariantMessage } from '@components/lib/variant-message/variant-message';

import { showCaseSchema } from '@validations/user-infos-schema';

import { FormCardContainer } from '@pages/dashboard/__components/form-card-container/form-card-container';

import { TUserMeInfos } from '@interfaces/user-infos';

import { api } from '@utils/api';

import { EXTENSION_IMAGES_ALLOWED } from '@constants/index';

const ShowCaseForm = ({ user }: { user: TUserMeInfos }) => {
  const form = useZodForm({
    schema: showCaseSchema,
    defaultValues: {
      photos: [
        {
          name: '',
          file: [],
          description: '',
        },
        {
          name: '',
          file: [],
          description: '',
        },
        {
          name: '',
          file: [],
          description: '',
        },
      ],
    },
  });

  const { data, refetch, isLoading, error } = api.skill.getSkills.useQuery();

  const {
    register,
    setValue,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const { fields } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'photos', // unique name for your Field Array
  });

  const watchFile = useCallback(idx => watch(`photos.${idx}.file`, []), []);
  const hasPhotoErrors = errors?.photos?.length > 0;
  const photoMessage = errors?.photos?.map(photo => photo.file?.message)?.[0];

  const handleChangeFile = (file, idx) => {
    setValue(`photos.${idx}.file`, file);
  };

  console.log(errors);

  const onSubmit = async data => {
    console.log(data);
  };

  // useEffect(() => {
  //   if (user) {
  //     const fieldPhotos = user?.show_case_photos?.map(photo => ({
  //       file: photo?.url,
  //       description: photo?.description,
  //       name: photo?.name,
  //     }));

  //     const skills = user?.skills?.map(skill => ({
  //       label: skill?.name,
  //       value: skill?.id,
  //     }));

  //     reset({
  //       // photos: fieldPhotos,
  //       skills,
  //     });
  //   }
  // }, [reset, user]);

  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Mise en avant
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Ajouter des informations nécessaire pour mettre en avant votre
              savoir et vos compétences.
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <Form form={form} onSubmit={onSubmit}>
            <FormCardContainer
              footer={
                <div className="flex justify-end">
                  <Button variant="primary">Enregistrer</Button>
                </div>
              }
            >
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <div>
                    <Field
                      error={hasPhotoErrors && (photoMessage as string)}
                      label="Photos à la une"
                    >
                      <div className="grid md:grid-cols-3 gap-3">
                        {fields.map((field, idx) => (
                          <FileUpload
                            key={field.id}
                            accept={EXTENSION_IMAGES_ALLOWED}
                            handleAddFile={file => handleChangeFile(file, idx)}
                            handleRemoveFile={file =>
                              handleChangeFile(file, idx)
                            }
                            value={watchFile(idx)}
                            preview={null}
                            {...(register(`photos.${idx}.file`) as any)}
                          >
                            {({ openFile, files, onRemoveFile }) => {
                              const hasName = (files as FileWithPreview[])[0]
                                ?.name;
                              return (
                                <>
                                  {!hasName ? (
                                    <ImageEmpty
                                      title="Choisissez une photo"
                                      className="h-52 w-full"
                                      onClick={openFile}
                                    />
                                  ) : (
                                    <div className="w-full flex gap-3">
                                      {files.map((file: FileWithPreview) => (
                                        <ActionOnTop
                                          key={file?.name}
                                          className={clsx(
                                            'rounded-md h-52 w-full',
                                            hasPhotoErrors &&
                                              errors?.photos[idx]?.file
                                                ?.message &&
                                              'border-2 border-red-500'
                                          )}
                                          viewActionMode="hover"
                                          bgElement={
                                            <ImageUI
                                              title="Choisissez une photo"
                                              className="h-52 w-full"
                                              src={file?.preview}
                                              name={file?.name}
                                            />
                                          }
                                        >
                                          <div className="flex justify-center items-center gap-3 w-full">
                                            <Button
                                              title="Changez l'image"
                                              onClick={openFile}
                                              type="button"
                                              variant="light"
                                              className="p-1 bg-transparent"
                                            >
                                              <HiOutlinePencil className="h-6 w-6" />
                                            </Button>
                                            <Button
                                              title="Supprimez l'image"
                                              onClick={() => onRemoveFile(file)}
                                              type="button"
                                              variant="light"
                                              className="p-1 bg-transparent"
                                            >
                                              <HiOutlineTrash className="h-6 w-6" />
                                            </Button>
                                          </div>
                                        </ActionOnTop>
                                      ))}
                                    </div>
                                  )}
                                </>
                              );
                            }}
                          </FileUpload>
                        ))}
                      </div>
                    </Field>
                  </div>
                </div>

                {/* Compétences */}
                <div className="col-span-6 sm:col-span-4">
                  <Field label="Mes compétences / atouts">
                    <Controller
                      name="skills"
                      control={control}
                      rules={{ required: true }}
                      render={({ field, fieldState }) => (
                        <SelectUI
                          isMulti
                          {...field}
                          inputId="skills"
                          options={data?.skills?.map(skill => ({
                            label: skill?.name,
                            value: skill?.id,
                          }))}
                        />
                      )}
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

export { ShowCaseForm };
