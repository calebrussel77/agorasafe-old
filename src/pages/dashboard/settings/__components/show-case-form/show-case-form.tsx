import { User } from '@prisma/client';
import { useFieldArray } from 'react-hook-form';
import { HiOutlinePencil } from 'react-icons/hi';
import { HiOutlineTrash } from 'react-icons/hi2';

import { Field } from '@components/lib/Field/Field';
import { Button } from '@components/lib/button/button';
import Form, { useZodForm } from '@components/lib/form/form';
import ImageEmpty from '@components/lib/image-empty/image-empty';
import ImageWithElementsOnTop from '@components/lib/image-with-elements-on-top/image-with-elements-on-top';
import { Label } from '@components/lib/label/label';
import { AsyncCreatableSelectUI } from '@components/lib/select';
import {
  FileUpload,
  FileWithPreview,
} from '@components/lib/upload/file-upload';

import { FormCardContainer } from '@pages/dashboard/__components/form-card-container/form-card-container';

import { TRegister } from '@interfaces/auth-user';

import { EXTENSION_IMAGES_ALLOWED } from '@constants/index';

type TShowCaseForm = TRegister & {
  confirmError?: any;
  desireError?: any;
};

const ShowCaseForm = ({ user }: { user: Omit<User, 'password'> }) => {
  const form = useZodForm({
    defaultValues: {
      photos: [
        {
          content: '',
          file: [],
        },
        {
          content: '',
          file: [],
        },
        {
          content: '',
          file: [],
        },
      ],
    },
  });

  const {
    register,
    setValue,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'photos', // unique name for your Field Array
  });

  const watchFile = idx => watch(`photos.${idx}.file`, []);

  const handleChangeFile = (file, idx) => {
    setValue(`photos.${idx}.file`, file);
  };

  const onSubmit = async (data: TShowCaseForm) => {
    console.log(data);
  };

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
                <div className="col-span-6">
                  <div>
                    <Label className="font-semibold" required>
                      Photos à la une
                    </Label>
                    <div className="grid md:grid-cols-3 gap-3">
                      {fields.map((field, idx) => (
                        <FileUpload
                          key={field.id}
                          accept={EXTENSION_IMAGES_ALLOWED}
                          handleAddFile={file => handleChangeFile(file, idx)}
                          handleRemoveFile={file => handleChangeFile(file, idx)}
                          value={watchFile(idx)}
                          preview={null}
                          {...(register(`photos.${idx}.file`) as any)}
                        >
                          {({ openFile, files, onRemoveFile }) => {
                            const hasName = (files as FileWithPreview[])[0]
                              ?.name;
                            return (
                              <>
                                <div className="w-full flex items-center gap-3">
                                  {!hasName ? (
                                    <ImageEmpty
                                      title="Choisissez une photo"
                                      className="h-52 w-full"
                                      onClick={openFile}
                                    />
                                  ) : (
                                    <div className="w-full flex gap-3">
                                      {files.map((file: FileWithPreview) => (
                                        <ImageWithElementsOnTop
                                          key={file.preview}
                                          shape="rounded"
                                          imageClassName="h-52 w-full"
                                          size="xl"
                                          src={file.preview}
                                          name={file.name}
                                        >
                                          <div className="flex items-center gap-3 text-white">
                                            <Button
                                              type="button"
                                              title="Changez la photo"
                                              variant="subtle"
                                              onClick={openFile}
                                            >
                                              <HiOutlinePencil />
                                            </Button>
                                            <Button
                                              type="button"
                                              title="Supprimez la photo"
                                              variant="subtle"
                                              onClick={() => onRemoveFile(file)}
                                            >
                                              <HiOutlineTrash />
                                            </Button>
                                          </div>
                                        </ImageWithElementsOnTop>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </>
                            );
                          }}
                        </FileUpload>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Compétences */}
                <div className="col-span-6 sm:col-span-3">
                  <Field label="Mes compétences / atouts" required>
                    <AsyncCreatableSelectUI
                      isMulti
                      onSearch={() => Promise.resolve([])}
                      defaultOptions={[
                        {
                          label: 'salut',
                          value: 'ss',
                        },
                        {
                          lavel: 'Jerome',
                          value: 'sssa',
                        },
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

export { ShowCaseForm };
