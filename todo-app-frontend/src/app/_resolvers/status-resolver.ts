import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { StatusDto } from "../_dtos/status-dto";
import { StatusService } from "../_services/status.service";

export const loadStatusResolver: ResolveFn<StatusDto[]> = async () => {
    const statusService = inject(StatusService);

    if (statusService.status().length) return statusService.status();

    await statusService.loadStatus();
    return statusService.status();
}