import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { CurrentUser } from './../auth/user.decorator'
import { DeleteEquipmentInput } from './inputs/deleteEquipment.input'
import { EquipmentInput } from './inputs/equipment.input'
import { MachineryFuelRegistryInput } from './inputs/machineryFuelRegistry.input'
import { MachineryJobRegistryInput } from './inputs/machineryJobRegistry.input'
import { UpdateEquipmentInput } from './inputs/updateEquipment.input'
import { Machinery } from './machinery.schema'
import { MachineryService } from './machinery.service'
import { CreateEquipmentResultUnion } from './outputs/createEquipment.output'
import { DeleteEquipmentResultUnion } from './outputs/deleteEquipment.output'
import { EquipmentsByBookingResultUnion } from './outputs/equipmentsByBooking.output'
import { MachineryFuelRegistryResultUnion } from './outputs/machineryFuelRegistry.output'
import { MachineryJobRegistryResultUnion } from './outputs/machineryJobRegistry.output'
import { UpdateEquipmentResultUnion } from './outputs/updateEquipment.output'
import { MachineryMaintenance } from './machineryMaintenance.schema'
import { Public } from '../auth/public.decorator'
import { Inject } from '@nestjs/common'
import { PubSubEngine } from 'graphql-subscriptions'
import { FullMaintenance } from './results/fullMaintenance.result'
import { FullMachineryJobRegistry } from './results/fullMachineryJobRegistry.result'
import { UpdateMachineryJobRegistryInput } from './inputs/updateMachineryJobRegistry.input'
import { UpdateMachineryJobRegistryResultUnion } from './outputs/updateMachineryJobRegistry.output'
import { DeleteMachineryJobRegistryInput } from './inputs/deleteMachineryJobRegistry.input'
import { DeleteMachineryJobRegistryResultUnion } from './outputs/deleteMachineryJobRegistry.output'
import { FullMachineryFuelRegistry } from './results/fullMachineryFuelRegistry.result'
import { DeleteMachineryFuelRegistryResultUnion } from './outputs/deleteMachineryFuelRegistry.output'
import { DeleteMachineryFuelRegistryInput } from './inputs/deleteMachineryFuelRegistry.input'
import { Ok } from 'src/commons/results/ok.result'

@Resolver()
export class MachineryResolver {

    constructor(
        @Inject('PUB_SUB')
        private pubSub: PubSubEngine,
        private readonly machineryService: MachineryService
    ) {}

    @Query( () => [ Machinery ] )
    async getAllEquipments() {

        return await this.machineryService.getAllEquipments()
    
    }

    @Mutation( () => CreateEquipmentResultUnion)
    async createEquipment(@Args('form') form: EquipmentInput) {

        return await this.machineryService.createEquipment(form)
    
    }

    @Mutation( () => UpdateEquipmentResultUnion)
    async updateEquipment(@Args('form') form: UpdateEquipmentInput) {

        return await this.machineryService.updateEquipment(form)
    
    }

    @Mutation( () => DeleteEquipmentResultUnion)
    async deleteEquipment(@Args('form') form: DeleteEquipmentInput) {

        return await this.machineryService.deleteEquipment(form)
    
    }

    @Query( () => EquipmentsByBookingResultUnion)
    async getAllEquipmentsByBuilding(@Args('user') user: string, @Args('date') date: string) {

        return await this.machineryService.getAllEquipmentsByBuilding(user, date)
    
    }

    @Mutation( () => MachineryJobRegistryResultUnion)
    async createMachineryJobRegistry(@Args('form') form: MachineryJobRegistryInput, @CurrentUser() user: string) {

        return await this.machineryService.createMachineryJobRegistry(form, user)
    
    }

    @Mutation( () => UpdateMachineryJobRegistryResultUnion)
    async updateMachineryJobRegistry(@Args('form') form: UpdateMachineryJobRegistryInput) {

        return await this.machineryService.updateMachineryJobRegistry(form)
    
    }

    @Mutation( () => DeleteMachineryJobRegistryResultUnion)
    async deleteMachineryJobRegistry(@Args('form') form: DeleteMachineryJobRegistryInput) {

        return await this.machineryService.deleteMachineryJobRegistry(form)
    
    }

    @Mutation( () => MachineryFuelRegistryResultUnion)
    async createMachineryFuelRegistry(@Args('form') form: MachineryFuelRegistryInput, @CurrentUser() user: string) {

        return await this.machineryService.createMachineryFuelRegistry(form, user)
    
    }

    @Query( () => [ FullMachineryFuelRegistry ] )
    async getAllFuelRegistries(@Args('startDate') startDate: string, @Args('endDate') endDate: string) {

        return await this.machineryService.getAllFuelRegistries(startDate, endDate)
    
    }

    @Query( () => [ FullMachineryFuelRegistry ] )
    async getAllPreviousFuelRegistries(@Args( { name: 'equipments', type: () => [ String ] } ) equipments: string[] ) {

        return await this.machineryService.getAllPreviousFuelRegistries(equipments)
    
    }

    @Query( () => [ FullMaintenance ] )
    async getAllLastMaintenance() {

        return await this.machineryService.getAllLastMaintenance()
    
    }

    @Query( () => [ FullMaintenance ] )
    async getMaintenancePage(@Args('equipment') equipment: string, @Args('lastUid') lastUid: number) {

        return await this.machineryService.getMaintenancePage(equipment, lastUid)
    
    }

    @Mutation( () => MachineryMaintenance)
    async changeMaintenanceStatus(@Args('id') id: string) {

        return await this.machineryService.changeMaintenanceStatus(id)
    
    }

    @Mutation( () => MachineryMaintenance)
    async deleteMaintenance(@Args('id') id: string) {

        return await this.machineryService.deleteMaintenance(id)
    
    }

    @Public()
    @Subscription( () => FullMaintenance, {
        name: 'maintenanceAdded',
    } )
    maintenanceAdded() {

        return this.pubSub.asyncIterator('maintenanceAdded')
    
    }

    @Public()
    @Subscription( () => MachineryMaintenance, {
        name: 'maintenanceStatusUpdated',
    } )
    maintenanceStatusUpdated() {

        return this.pubSub.asyncIterator('maintenanceStatusUpdated')
    
    }

    @Public()
    @Subscription( () => MachineryMaintenance, {
        name: 'maintenanceDeleted',
    } )
    maintenanceDeleted() {

        return this.pubSub.asyncIterator('maintenanceDeleted')
    
    }

    @Query( () => FullMachineryJobRegistry)
    async getAllMachineryJobRegistry() {

        return await this.machineryService.getAllMachineryJobRegistry()
    
    }

    @Query( () => FullMachineryJobRegistry)
    async getAllMachineryJobRegistryByUserAndDate(@Args('user') user: string, @Args('startDate') startDate: string, @Args('endDate') endDate: string) {

        return await this.machineryService.getAllMachineryJobRegistryByUserAndDate(user, startDate, endDate)
    
    }

    @Query( () => FullMachineryJobRegistry)
    async getAllMachineryJobRegistryByUser(@Args( { nullable: true, name: 'user' } ) user: string, @Args( { nullable: true, name: 'next' } ) next: string) {

        return await this.machineryService.getAllMachineryJobRegistryByUser(user, next)
    
    }

    @Query( () => FullMachineryJobRegistry)
    async getAllMachineryJobRegistryByDate(@Args('date') date: string) {

        return await this.machineryService.getAllMachineryJobRegistryByDate(date)
    
    }

    @Query( () => FullMachineryJobRegistry)
    async getPreviousMachineryJobRegistry(@Args('user') user: string, @Args('date') date: string, @Args('equipment') equipment: string) {

        return await this.machineryService.getPreviousMachineryJobRegistry(user, date, equipment)
    
    }

    @Query( () => [ FullMachineryFuelRegistry ] )
    async getAllMachineryFuelRegistryByUser(@Args( { nullable: true, name: 'user' } ) user: string) {

        return await this.machineryService.getAllMachineryFuelRegistryByUser(user)
    
    }

    @Mutation( () => DeleteMachineryFuelRegistryResultUnion)
    async deleteMachineryFuelRegistry(@Args('form') form: DeleteMachineryFuelRegistryInput) {

        return await this.machineryService.deleteMachineryFuelRegistry(form)
    
    }

    @Public()
    @Subscription( () => FullMachineryJobRegistry, {
        name: 'jobRegistryAdded',
    } )
    jobRegistryAdded() {

        return this.pubSub.asyncIterator('jobRegistryAdded')
    
    }

    @Public()
    @Subscription( () => String, {
        name: 'jobRegistryDeleted',
    } )
    jobRegistryDeleted() {

        return this.pubSub.asyncIterator('jobRegistryDeleted')
    
    }

    @Public()
    @Subscription( () => FullMachineryJobRegistry, {
        name: 'jobRegistryUpdated',
    } )
    jobRegistryUpdated() {

        return this.pubSub.asyncIterator('jobRegistryUpdated')
    
    }

    @Query( () => Ok)
    async sendJobRegistryByEmail(@Args('file') file: string, @Args('folio') folio: string, @Args( { name: 'receivers', type: () => [ String ] } ) receivers: string[] ) {

        return await this.machineryService.sendJobRegistryByEmail(file, folio, receivers)
    
    }

    @Query( () => FullMachineryJobRegistry)
    async getJobRegistryById(@Args('id') id: string) {

        return await this.machineryService.getJobRegistryById(id)
    
    }

}
