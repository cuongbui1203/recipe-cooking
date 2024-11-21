import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityManager, EntityMetadataNotFoundError } from 'typeorm';

@Injectable()
export class CheckExistsPipe implements PipeTransform {
  constructor(private readonly entityManager: EntityManager) {}

  async transform(value: number, metadata: ArgumentMetadata) {
    const repository = this.entityManager.getRepository(metadata.metatype);
    try {
      return await repository.findOneOrFail({
        where: {
          id: value,
        },
      });
    } catch (err) {
      if (err instanceof EntityMetadataNotFoundError) {
        console.log(`Entity metadata not found for ${metadata.metatype.name}`);
        throw new InternalServerErrorException();
      }
      console.log(`Error checking id: ${err.message}`);
      throw new NotFoundException('invalid id');
    }
  }
}
