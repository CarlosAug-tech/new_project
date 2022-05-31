interface ICreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ICreateUserResponseDTO {
  id: string;
  name: string;
  email: string;
  created_at: Date;
}

export { ICreateUserRequestDTO, ICreateUserResponseDTO };
