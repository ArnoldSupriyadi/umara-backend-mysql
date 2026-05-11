<?php

declare(strict_types=1);

namespace App\Policies;

use Illuminate\Foundation\Auth\User as AuthUser;
use App\Models\BusinessUnit;
use Illuminate\Auth\Access\HandlesAuthorization;

class BusinessUnitPolicy
{
    use HandlesAuthorization;
    
    public function viewAny(AuthUser $authUser): bool
    {
        return $authUser->can('ViewAny:BusinessUnit');
    }

    public function view(AuthUser $authUser, BusinessUnit $businessUnit): bool
    {
        return $authUser->can('View:BusinessUnit');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('Create:BusinessUnit');
    }

    public function update(AuthUser $authUser, BusinessUnit $businessUnit): bool
    {
        return $authUser->can('Update:BusinessUnit');
    }

    public function delete(AuthUser $authUser, BusinessUnit $businessUnit): bool
    {
        return $authUser->can('Delete:BusinessUnit');
    }

    public function restore(AuthUser $authUser, BusinessUnit $businessUnit): bool
    {
        return $authUser->can('Restore:BusinessUnit');
    }

    public function forceDelete(AuthUser $authUser, BusinessUnit $businessUnit): bool
    {
        return $authUser->can('ForceDelete:BusinessUnit');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('ForceDeleteAny:BusinessUnit');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('RestoreAny:BusinessUnit');
    }

    public function replicate(AuthUser $authUser, BusinessUnit $businessUnit): bool
    {
        return $authUser->can('Replicate:BusinessUnit');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('Reorder:BusinessUnit');
    }

}