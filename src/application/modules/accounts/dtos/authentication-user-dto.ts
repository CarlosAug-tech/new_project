interface IAuthenticationUserRequestDTO {
  email: string;
  password: string;
}

interface IAuthenticationUserResponseDTO {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export { IAuthenticationUserRequestDTO, IAuthenticationUserResponseDTO };
