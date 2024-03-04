import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { CreateProfleUserParams, CreateUserParams, CreateUserPostParams, UpdateUserParams } from 'src/ultils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    ) 
    {
    
  }

  findUsers() {
   return this.userRepository.find({relations: [ "profile" ]});
  }

  createUser(userDetail: CreateUserParams) {
    const newUser = this.userRepository.create({ ...userDetail,
    });
    return this.userRepository.save(newUser);

  }

  updateUsers(id:number, updateUserDetail: UpdateUserParams){
   return this.userRepository.update({id}, {...updateUserDetail});
  }

  deleteUsers(id: number){
    return this.userRepository.delete({ id })
  }

  async createProfileUser(id: number, createProfileUserDetail: CreateProfleUserParams){
    const user = await this.userRepository.findOneBy({ id });
    if(!user) throw new HttpException(
      'User not found. Cannot create Profile',
      HttpStatus.BAD_REQUEST
    );
      const  newProfile = this.profileRepository.create({...createProfileUserDetail})
      const saveProfile = await this.profileRepository.save(newProfile);
      user.profile = saveProfile;
      return this.userRepository.save(user);
  }

  async createUserPost(id: number, createUserPostDetail: CreateUserPostParams){
    const user = await this.userRepository.findOneBy({ id });  
    if(!user) throw new HttpException(
      'User not found. Cannot create Post',
      HttpStatus.BAD_REQUEST
    );
      const  newPost = this.postRepository.create({...createUserPostDetail,user,})
      return this.userRepository.save(newPost);
  }
}
