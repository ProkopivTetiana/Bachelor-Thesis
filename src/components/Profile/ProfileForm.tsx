// ProfileForm
import { type Dispatch, type SetStateAction, useCallback } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import FormInput from "../FormInput";
import { type TypeOf, object, string } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useFormik } from "formik";
import { type User } from "~/types/GlobalType";

const ProfileFormSchema = object({
  email: string({
    required_error: "Photo can't be empty",
  }),
  password: string({
    required_error: "Password can't be empty",
  }),
  first_name: string({
    required_error: "First name can't be empty",
  }),
  last_name: string({
    required_error: "Last name can't be empty",
  }),
  contact_info: string({
    required_error: "Contact info can't be empty",
  }),
});
type ProfileFormInputs = TypeOf<typeof ProfileFormSchema>;

interface ProfileFormProps {
  activeUser: User;
  isEdit: boolean;
  setIsEdite: Dispatch<SetStateAction<boolean>>;
}

const ProfileForm = ({ activeUser, isEdit, setIsEdite }: ProfileFormProps) => {
  const ctx = api.useUtils();
  const router = useRouter();
  // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { mutate: createUser, isPending: isCreateLoading } =
    api.user.createUser.useMutation({
      onSuccess: async (user) => {
        // await ctx.user.getAll.refetch();
        void router.push(`/profile/${user.id}`);
        console.log("created user:", user);
      },
      onError: (e) => {
        console.log(e);
      },
    });

  const { mutate: updateUser, isPending: isUpdateLoading } =
    api.user.updateUser.useMutation({
      onSuccess: async (user) => {
        await ctx.user.getUserById.refetch();
        setIsEdite(false);
        void router.push(`/profile/${user.id}`);
        console.log("update user:", user);
      },
      onError: (e) => {
        console.log(e);
      },
    });

  const { values, touched, errors, setFieldValue, handleSubmit } =
    useFormik<ProfileFormInputs>({
      initialValues: {
        email: activeUser.email,
        password: activeUser.password,
        first_name: activeUser.first_name,
        last_name: activeUser.last_name,
        contact_info: activeUser.contact_info,
      },
      isInitialValid: true,
      validationSchema: toFormikValidationSchema(ProfileFormSchema),
      onSubmit: (values) => {
        console.log("-=-= onSubmit values", values);
        if (isEdit && activeUser.id) {
          updateUser({
            user_id: activeUser.id,
            ...values,
          });
        } else {
          createUser({
            ...values,
          });
        }
      },
    });

  const setInputValue = useCallback(
    (field: string, value: string) => {
      setFieldValue(field, value).catch(console.log);
    },
    [setFieldValue],
  );

  return (
    <div className="flex h-full w-full px-4 sm:px-12">
      {isCreateLoading || isUpdateLoading ? (
        <div>Is Loading ...</div>
      ) : (
        <div className="flex h-full w-full flex-col gap-12 rounded-lg border border-gray-300 bg-orange-100 p-8 shadow-md md:flex-row">
          {/* <ImageFilePicker
            value={values.photo}
            setImageBase={(val) => setInputValue("photo", val)}
            errorMessage={touched.photo && errors.photo ? errors.photo : ""}
          /> */}
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col justify-between gap-4"
          >
            <div className="flex flex-col gap-4">
              <FormInput
                id="email"
                label="Email"
                name="email"
                type="email"
                placeholder="email"
                value={values.email}
                onChange={(val) => setInputValue("email", val)}
                errorMessage={touched.email && errors.email ? errors.email : ""}
              />
              <FormInput
                id="password"
                label="Пароль"
                name="password"
                type="text"
                placeholder="password"
                value={values.password}
                onChange={(val) => setInputValue("password", val)}
                errorMessage={
                  touched.password && errors.password ? errors.password : ""
                }
              />
              <FormInput
                id="first_name"
                label="Ім'я"
                name="first_name"
                type="text"
                placeholder="first_name"
                value={values.first_name}
                onChange={(val) => setInputValue("first_name", val)}
                errorMessage={
                  touched.first_name && errors.first_name
                    ? errors.first_name
                    : ""
                }
              />
              <FormInput
                id="last_name"
                label="Прізвище"
                name="last_name"
                type="text"
                placeholder="last_name"
                value={values.last_name}
                onChange={(val) => setInputValue("last_name", val)}
                errorMessage={
                  touched.last_name && errors.last_name ? errors.last_name : ""
                }
              />
              <FormInput
                id="contact_info"
                label="Контактна інформація"
                name="contact_info"
                type="text"
                placeholder="contact_info"
                value={values.contact_info}
                onChange={(val) => setInputValue("contact_info", val)}
                errorMessage={
                  touched.contact_info && errors.contact_info
                    ? errors.contact_info
                    : ""
                }
              />
            </div>
            <div className="flex items-center justify-end">
              <div className="flex gap-4">
                {isEdit && (
                  <button
                    type="button"
                    onClick={() => setIsEdite(false)}
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    disabled={isCreateLoading || isUpdateLoading}
                  >
                    Скасувати
                  </button>
                )}

                <button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  disabled={isCreateLoading || isUpdateLoading}
                >
                  {isEdit ? "Оновити" : "Створити"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
