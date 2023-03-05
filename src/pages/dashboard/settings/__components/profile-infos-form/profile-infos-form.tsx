import { Field } from '@components/lib/Field/Field';
import { Avatar } from '@components/lib/avatar/avatar';
import { Button } from '@components/lib/button/button';
import { Checkbox } from '@components/lib/checkbox/checkbox';
import Form, { useZodForm } from '@components/lib/form/form';
import { Input } from '@components/lib/input/input';
import { Label } from '@components/lib/label/label';
import { Notification } from '@components/lib/notification/notification';
import { RadioGroup } from '@components/lib/radio-group/radio-group';
import { Textarea } from '@components/lib/textarea/textarea';
import {
  FileUpload,
  FileWithPreview,
} from '@components/lib/upload/file-upload';

import { FormCardContainer } from '@pages/dashboard/__components/form-card-container/form-card-container';

import { TRegister } from '@interfaces/auth-user';

import { EXTENSION_IMAGES_ALLOWED } from '@constants/index';

type TProfileInfosForm = TRegister & {
  confirmError?: any;
  desireError?: any;
};

const ProfileInfosForm = () => {
  const form = useZodForm({});
  const {
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const watchFile = watch('profile_pic', []);

  const handleChangeFile = file => {
    setValue('profile_pic', file);
  };

  const onSubmit = async (data: TProfileInfosForm) => {
    console.log(data);
  };

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
                  <Field label="Photo">
                    <FileUpload
                      accept={EXTENSION_IMAGES_ALLOWED}
                      handleAddFile={handleChangeFile}
                      handleRemoveFile={handleChangeFile}
                      value={watchFile}
                      preview={null}
                      {...(register('profile_pic') as any)}
                    >
                      {({ openFile, files, onRemoveFile }) => {
                        const hasName = (files as FileWithPreview[])[0]?.name;
                        return (
                          <>
                            <div className="flex items-center gap-3">
                              {!hasName ? (
                                <Avatar size="xxl" name="Caleb Russel" />
                              ) : (
                                <div>
                                  {files.map((file: FileWithPreview) => (
                                    <button
                                      key={file.preview}
                                      type="button"
                                      onClick={() => onRemoveFile(file)}
                                      className="group hover:opacity-70"
                                    >
                                      <Avatar
                                        size="xxl"
                                        src={file.preview}
                                        name={file.name}
                                      />
                                    </button>
                                  ))}
                                </div>
                              )}
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
                        <span className="inline-flex items-center text-sm text-gray-600">
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
                      placeholder="Doe"
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
                        <Checkbox
                          {...register('isProvider', { value: true })}
                        />
                      </Field>
                      <Field label="Demander des services">
                        <Checkbox
                          {...register('isCustomer', { value: true })}
                        />
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
                        <Checkbox {...register('isOnsite', { value: true })} />
                      </Field>
                      <Field label="Distance">
                        <Checkbox {...register('isRemote', { value: true })} />
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
